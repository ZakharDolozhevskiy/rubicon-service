import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common"
import { KrakenService } from "./kraken.service"
import { CreateKrakenDto } from "./dto/create-kraken.dto"
import { UpdateKrakenDto } from "./dto/update-kraken.dto"

@Controller("kraken")
export class KrakenController {}
