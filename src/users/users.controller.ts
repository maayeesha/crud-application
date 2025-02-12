import { Controller, Param,Get, Body, Patch,Post, Delete, Query,ParseIntPipe,ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('users')
export class UsersController {
    
constructor(private readonly usersService: UsersService){}
    @Get()
    findAll(@Query('role') role?: 'Doctor' | 'Patient' | 'Admin'){
        return this.usersService.findAll(role)
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(+id) // "+" converts id to a number
    }
@Post()
create(@Body(ValidationPipe) createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto)
}

@Patch(':id')
update(@Param('id',ParseIntPipe) id:number, @Body() updateUserDto: UpdateUserDto){
    return this.usersService.update(id,updateUserDto)
}

@Delete(':id')
delete(@Param('id',ParseIntPipe) id:number){
    return this.usersService.delete(id)
}
}
