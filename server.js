var express = require('express');
var app = express();
var mongodjs = require('mongojs');
var db = mongodjs('mongodb://localhost:27017/test', ['contactList',
  'customerAddress','productSearch','user','location','sublocation','customerProfile']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var finalDate = day+"-"+month+"-"+year;

app.get('/contactList',function(req,res) {
   console.log(finalDate);
	console.log("received request from the client");
	db.contactList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
 	 });

});
// user login check
app.get('/user/',function(req,res) {
  var email = req.query.email
  console.log("received request from the client");
  db.customerProfile.findOne({email:email},function (err, docs) {
    if(err) {
        res.json(err);
    }else {
      if(docs == null)
      {
        res.send("empty");
      }else {
       console.log(docs);
       res.json(docs);
      }
    }
   });

});


app.get('/productSearch/',function(req,res) {
  console.log("productLoad");
  var productCat = req.query.parenCategory;
  console.log(productCat);
  if(req.query.search == "") {
      console.log("received request from the client for category load");
      db.productSearch.find({productCategory:productCat},function (err, docs) {
      console.log(docs);
      res.json(docs);
   });
    }
      if(req.query.search != "") {

      console.log("received request from the client for product search load");  
      db.productSearch.find({productCategory:productCat,productMake:req.query.search},function (err, docs) {
      console.log(docs);
      res.json(docs);
   });
  }
 

});


app.post('/contactList', function (req, res) {
  console.log(req.body);
  db.contactList.insert(req.body, function(err, doc) {
    if(err){
        res.json(err);
    } else {
        res.json("Success");
    }
  });
});

//android new customer registration 
app.get('/customerRegister/', function (req, res) {
  var customerId = Math.floor((Math.random() *100) + 1)+""+req.query.phoneNumber;
  console.log(customerId);
  db.customerProfile.insert(
{
  customerId:req.query.customerId,
  fName:req.query.fName,
  lName:req.query.lName,
    email:req.query.email,
      phoneNumber:req.query.phoneNumber,
        password:req.query.password,
          DOB:req.query.DOB,
           registrationDate:req.query.registrationDate,
           secondaryPhoneNumber:req.query.phoneNumber,
             preferredStoreId:" default",
              myOrders:['default','default'],
               previousOrderCount:"0",
                registrationDate:finalDate,
                 previousPasswords:req.query.password,
                   LastUsedPromotions:['default','default','default'],
                      voucherAvailable:['default1','default2'],
                        numberOfRejectedDeliveries:"0",
                          partialOrderInBaskeet:"default",
                            contactAddress:req.query.customerId,
                        emailSubscription:req.query.emailSubscription}
    , function(err, doc) {
    if(err){
      console.log(err);
        res.json(err);
    } else {
        console.log(doc);
        res.send("Success");
    }
  });
});


//customer profile update 
//android new customer registration 
app.get('/customerRegisterUpdate/', function (req, res) {
  var customerId = Math.floor((Math.random() *100) + 1)+""+req.query.phoneNumber;
  console.log(customerId);
  db.customerProfile.update(
{customerId:req.query.customerId},{$set:{
  fName:req.query.fName,
  lName:req.query.lName,
    email:req.query.email,
      phoneNumber:req.query.phoneNumber,
        password:req.query.password,
          DOB:req.query.DOB,
           registrationDate:req.query.registrationDate,
           secondaryPhoneNumber:req.query.phoneNumber,
             preferredStoreId:" default",
              myOrders:['default','default'],
               previousOrderCount:"0",
                registrationDate:finalDate,
                 previousPasswords:req.query.password,
                   LastUsedPromotions:['default','default','default'],
                      voucherAvailable:['default1','default2'],
                        numberOfRejectedDeliveries:"0",
                          partialOrderInBaskeet:"default",
                            contactAddress:req.query.customerId,
                        emailSubscription:req.query.emailSubscription}}
    , function(err, doc) {
    if(err){
      console.log(err);
        res.json(err);
    } else {
        console.log(doc);
        res.send("Success");
    }
  });
});
//android new customer Address registration 
app.get('/customerAddress/', function (req, res) {
  console.log("inside create address")
  console.log(req.query.customerId)
  db.customerAddress.insert(
{
 addressId:req.query.customerId,
  address1:req.query.address1,
   address2:req.query.address2,
   address3:req.query.address3,
    buildingNumber:req.query.buildingNumber,
      city:req.query.city,
        location:req.query.Nlocation,
          country:'india',
           postalCode:req.query.postalCode}
    , function(err, doc) {
    if(err){
      console.log(err);
        res.json(err);
    } else {
        console.log(doc);
        res.send("Success");
    }
  });
});

//android update customer Address  
app.get('/customerAddress/', function (req, res) {
  console.log("inside create address")
  console.log(req.query.customerId)
  db.customerAddress.update(
{
 addressId:req.query.customerId},{$set:{
  address1:req.query.address1,
   address2:req.query.address2,
   address3:req.query.address3,
    buildingNumber:req.query.buildingNumber,
      city:req.query.city,
        location:req.query.Nlocation,
          country:'india',
           postalCode:req.query.postalCode}}
    , function(err, doc) {
    if(err){
      console.log(err);
        res.json(err);
    } else {
        console.log(doc);
        res.send("Success");
    }
  });
});


//android new customer Address registration 
app.get('/myAddress/', function (req, res) {
  console.log(req.query.customerId);
  db.customerAddress.find({addressId:req.query.customerId},
    function(err, doc) {
    if(err){
        res.send("empty");
    } else {
         res.json(doc);
    }
  });
});

app.get('/productAdd/add/', function (req, res) {

  db.productSearch.insert({barcode:req.query.barcode,productName:req.query.productName,
    productCategory:req.query.productCategory,productMake:req.query.productMake,productPrice:req.query.productPrice}, 
    function(err, doc) {
    if(err){
        res.json(err);
    } else {
        res.json("Product Added Successfully!!!");
    }
  });
  
});
//for getting parent loaction 
app.get('/location', function (req, res) {
  db.location.find( 
    function(err, doc) {
    if(err){
        res.send("empty");
    } else {
        res.json(doc);
    }
  });
  
});
//for getting sub location of parent location 
app.get('/sublocation/', function (req, res) {
  db.sublocation.find({plocation:req.query.location},
    function(err, doc) {
    if(err){
        res.send("empty");
    } else {
      
         res.json(doc);
       
    }
  });
  
});

//for getting sub location of parent location 
app.get('/myaccount/', function (req, res) {
  console.log(req.query.customerId);
  db.customerProfile.find({customerId:req.query.customerId},
    function(err, doc) {
    if(err){
        res.send("empty");
    } else {
         res.json(doc);
    }
  });
  
});

app.delete('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.remove({_id: mongodjs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.findOne({_id: mongodjs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactList.findAndModify({
    query: {_id: mongodjs.ObjectId(id)},
    update: {$set: {name: req.body.name, contactaddress: req.body.contactaddress, phoneNumber: req.body.phoneNumber}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("server running on port 3000");