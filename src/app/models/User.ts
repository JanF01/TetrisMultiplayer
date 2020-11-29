export class User{

  id: number
  login: string
  nickname: string
  rank: string
  level: number
  experience: number
  money: number

  constructor(id, l,n,r,lvl,exp,m){
      this.id = id
      this.login = l
      this.nickname = n
      this.rank = r
      this.level = lvl
      this.experience = exp
      this.money = m
  }

}