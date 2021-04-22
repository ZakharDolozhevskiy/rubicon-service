import { Connection } from 'typeorm';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common"
import { OrderService } from '../orders/order.service'
import { KRAKEN_PAIRS, VENDOR_NAME } from './utils/constants'
import { CreateOrderDto } from './dto/create.order.dto'
import { KUpdateOrderDto } from './dto/update.order.dto'

@Controller('kraken')
export class KrakenController {
    @Inject(KRAKEN_PAIRS)
    private readonly pairs

    @Inject(OrderService)
    private orderService

    @Get('pairs')
    getPairs() {
        return this.pairs
    }

    @Get('orders')
    readAll() {
        return this.orderService.search({ vendor: VENDOR_NAME })
    }

    @Get('order/:id')
    readOne(@Param('id') id: number) {
        return this.orderService.search({ id, provider: VENDOR_NAME })
    }

    @Post('order')
    create(@Body() order: CreateOrderDto) {
        return this.orderService.create({
            vendor: VENDOR_NAME,
            ...order
        })
    }

    @Patch('order/:id')
    update(
        @Param('id') id: string,
        @Body() { target, amount }: UpdateOrderDto
    ) {
        return this.orderService.update(id, { target, amount })
    }

    @Delete('order/:id')
    delete(@Param('id') id: string) {
        return this.orderService.delete(id)
    }
}
