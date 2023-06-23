const express = require('express')
const router = express.Router();
const Subscriber = require('../model/subscriber');
const subscriber = require('../model/subscriber');
router.get('/',async (req,res)=>{
    try{
        const sub = await Subscriber.find()
        res.send(sub)

    }catch(err)
    {
        res.status(500).json({message : err.message})
    }

})
router.get('/:id', getSubscriber, (req,res)=>{
 res.json(res.subscribe.name)    

})
//for creating
router.post('/',async (req,res)=>{
    const subs = new Subscriber({

        name: req.body.name,
        subscribeToChannel : req.body.subscribeToChannel,
        subscribeDate :req.body.subscribeDate
    })
    try{
        const newSub = await subs.save();
        res.status(201).json(newSub);


    }catch(err){
        res.status(400).json({message : err.message});

    }

})
//for updating

router.patch('/:id',getSubscriber, async (req,res)=>{
   if(req.body.name != null){
    res.subscribe.name = req.body.name
   }
   if(subscribeToChannel != null){
    res.subscribe.subscribeToChannel = req.body.subscribeToChannel
   }
   try{
    const updateSubscriber = await res.subscribe.save()
    res.json('updated')

   }catch(err){
    res.status(400).json({message : err.message})

   }

})
// to delete
router.delete('/:id',getSubscriber,async (req,res)=>{
    try{
        await res.subscribe.remove()

    }catch(err){

        res.status(500).json({message:"err.message"})
    }

})
let subscribe;
async function getSubscriber(req,res,next){
    try
    {
        subscribe = await Subscriber.findById(req.params.id)
        if(!subscribe){
            return res.status(404).json({message : 'cannot find'})
        }

    }
    catch(err){
        return res.status(500).json({message: "err.message"})

    }
    res.subscribe = subscribe;
    next();

}

module.exports = router