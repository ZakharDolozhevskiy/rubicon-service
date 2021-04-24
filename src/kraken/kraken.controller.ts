import { Connection } from 'typeorm';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common"
import { OrderService } from '../orders/order.service'
import { KRAKEN_PAIRS, VENDOR_NAME } from './common/constants'
import { CreateOrderDto } from './dto/create.order.dto'
import { UpdateOrderDto } from './dto/update.order.dto'

@Controller('kraken')
export class KrakenController {
    @Inject(KRAKEN_PAIRS)
    private readonly pairs

    @Inject(OrderService)
    private orderService

    @Get('pairs')
    async getPairs() {
        return this.pairs
    }

    @Get('orders')
    async readAll() {
        return this.orderService.search({ vendor: VENDOR_NAME })
    }

    @Get('order/:id')
    async readOne(@Param('id') id: number) {
        const result = await this.orderService.search({ id, vendor: VENDOR_NAME })
        return result[0]
    }

    @Post('order')
    async create(@Body() order: CreateOrderDto) {
        // TODO: input validation
        // TODO: provide username from auth session
        return this.orderService.create({ ...order, vendor: VENDOR_NAME, user: 'default' })
    }

    @Patch('order/:id')
    async update(
        @Param('id') id: string,
        @Body() { target, amount }: UpdateOrderDto
    ) {
        // TODO: input validation
        return this.orderService.update(id, { target, amount })
    }

    @Delete('order/:id')
    async delete(@Param('id') id: string) {
        await this.orderService.delete(id)
        return { id }
    }
}
