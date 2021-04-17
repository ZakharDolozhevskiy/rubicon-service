import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common"
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Controller('kraken')
export class KrakenController {
    @Get('pairs')
    getSupportedPairs() {

    }

    @Get('orders')
    getActiveOrders() {

    }

    @Get('order/:id')
    getActiveOrder(@Param('id') id: string) {

    }

    @Put('order/:id')
    updateOrder(@Param('id') id: string, @Body() order: UpdateOrderDto) {

    }

    @Post('order')
    createOrder(@Body() order: CreateOrderDto) {

    }

    @Delete('order/:id')
    cancelOrder(@Param('id') id: string) {

    }
}
