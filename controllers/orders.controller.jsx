const Order = require('../models/order');
const AddOrder = async (req,res,next)=>{
  Order.collection.dropIndexes(function (err, results) {
    if (err) console.log(err);
    console.log(results);
    
});
let new_order = new Order(req.body);
new_order.save((err,order)=>{
  if(err){
    return res.status(400).json({
      error:err
    })
    next();
  }
  return res.status(200).json({
    success:"Order save effactué avec succes",
    order:order
  });
}
)

  
  }

const FindAllOrders = async (req,res)=>{
    Order.find().populate('name').select({name:1}).exec((err,order)=>{
console.log(order);
        if(err){
            console.log(err);
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:order

        });
    }
    )

  }


const DeleteOrder = async (req,res)=>{
   Order.findOneAndDelete({name:req.query.id},(err,order)=>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Order deleted effactué avec succes",
      order:order
    });})


  }


const UpdateOrder = async (req,res)=>{
  Order.findOneAndUpdate({_id:req.query.id},req.body,{new:true},(err,order)=>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Order updated effactué avec succes",
      order:order
    }); 
  })
  }

module.exports = {
    AddOrder,
    FindAllOrders,
    DeleteOrder,
    UpdateOrder,
}