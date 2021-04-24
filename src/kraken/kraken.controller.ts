import { Connection } from 'typeorm';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpStatus, HttpException } from "@nestjs/common"
import { OrderService } from '../orders/order.service'
import { KRAKEN_PAIRS, VENDOR_NAME } from './utils/constants'
import { CreateOrderDto } from './dto/create.order.dto'
import { UpdateOrderDto } from './dto/update.order.dto'
import { OrderParams } from './dto/validate.params.dto'

const vendor = VENDOR_NAME

@Controller('kraken')
export class KrakenController {
    @Inject(KRAKEN_PAIRS)
    private readonly pairs

    @Inject(OrderService)
    private orderService

    @Get('pairs')
    async getPairs(): Promise<String[]> {
        return this.pairs
    }

    @Get('orders')
    async readAll() {
        return this.orderService.search({ vendor })
    }

    @Get('order/:id')
    async readOne(@Param() params: OrderParams,) {
        const result = await this.orderService.search({ id: params.id, vendor })
        return result[0]
    }

    @Post('order')
    async create(@Body() order: CreateOrderDto) {
        if (this.pairs.includes(order.currency)) {
            return this.orderService.create({ ...order, vendor })
        } else {
            return new HttpException({ error: 'invalid order currency pair' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Patch('order/:id')
    async update(
        @Param() params: OrderParams,
        @Body() { target, amount }: UpdateOrderDto
    ) {
        if (target || amount) {
            const changes: Partial<UpdateOrderDto> = {}
            amount && (changes.amount = amount)
            target && (changes.target = target)
            return this.orderService.update(params.id, changes)
        } else {
            return new HttpException({ error: 'invalid input' }, HttpStatus.BAD_REQUEST)
        }
    }

    @Delete('order/:id')
    async delete(@Param() params: OrderParams) {
        await this.orderService.delete(params.id)
    }
}
