import Redis from "ioredis";



const redis = new Redis({
  host:process.env.REDIS_HOST,
  port:Number(process.env.REDIS_PORT),
  password:process.env.REDIS_PASSWORD,

})




redis.on("connect",()=>{
  console.log("connected to redis database ✅");
})

redis.on('error',(err)=>{
  console.log(`connection problem with redis` ,err);
})


export default redis