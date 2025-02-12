import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUserDto';
@Injectable()
export class UsersService {
    private users = [{
        "id": 1,
        "name": "Maayeesha",
        "email": "maayeesha@gmail.com",
        "role":"Patient",
    },
    {
        "id": 2,
        "name": "Farzana",
        "email": "farzana@gmail.com",
       // "password": "223344",
        "role":"Patient",
    },
    {
        "id": 3,
        "name": "Dr.Zaima",
        "email": "zaima@gmail.com",
       // "password": "223344",
        "role":"Doctor",
    }
,{
    "id": 4,
    "name": "Dr.Fariha",
    "email": "fariha@gmail.com",
   // "password": "223344",
    "role":"Doctor",
}
,{
    "id": 5,
    "name": "Rafi",
    "email": "rafi@gmail.com",
  //  "password": "223344",
    "role":"Patient",
}]

findAll(role?: 'Doctor' | 'Patient' | 'Admin'){
    if(role){
        const rolesArray =  this.users.filter(user=> user.role == role)
        if(rolesArray.length === 0){
throw new NotFoundException("User Not found")
return rolesArray
        }
    }
    return this.users
}

findOne(id:number){
    const user = this.users.find(user => user.id === id)
    if(!user) throw new NotFoundException("User Not Found")
    return user
}
create(createUserDto: CreateUserDto){
    const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)
    const newUser = {
        id: usersByHighestId[0].id+1,...createUserDto
    }
    this.users.push(newUser)
    return newUser
}
update(id:number, updateUserDto: UpdateUserDto ){
    this.users = this.users.map(user =>{
        if(user.id === id){
            return{...user,...updateUserDto}
        }
        return user
    })
}
delete(id: number){
    const removedUser = this.findOne(id)
    this.users = this.users.filter(user =>user.id !== id)
    return removedUser
}

}
 