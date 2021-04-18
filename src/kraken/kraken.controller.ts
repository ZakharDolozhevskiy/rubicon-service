import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common"
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { KRAKEN_PAIRS } from './common/constants'

@Controller('kraken')
export class KrakenController {
    constructor(@Inject(KRAKEN_PAIRS) private pairs) {}

    @Get('pairs')
    getSupportedPairs() {
        return this.pairs
    }

    @Get('orders')
    getActiveOrders() {

    }

    @Get('order/:id')
    getActiveOrder(@Param('id') id: string) {

    }

    @Patch('order/:id')
    updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {

    }

    @Post('order')
    createOrder(@Body() order: CreateOrderDto) {

    }

    @Delete('order/:id')
    cancelOrder(@Param('id') id: string) {

    }
}
