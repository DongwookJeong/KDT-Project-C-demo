const adddwSql = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'kdt305',
    database : 'adddw'
})

// ! field : seq,  
// ? type : int, 
// ? null : no, 
// ? key : pri, 
// ? default : null, 
// ? extra : auto_increment

// ! field : title,  
// ? type : varchar(70), 
// ? null : yes, 
// ? key : , 
// ? default : null, 
// ? extra : 

// ! field : content,  
// ? type : varchar(1000), 
// ? null : yes, 
// ? key : , 
// ? default : null, 
// ? extra : 