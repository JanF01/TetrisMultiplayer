export class User{

  login: string
  nickname: string
  rank: string
  level: number
  experience: string
  money: number

  constructor(l,n,r,lvl,exp,m){
      this.login = l
      this.nickname = n
      this.rank = r
      this.level = lvl
      this.experience = exp
      this.money = m
  }

}