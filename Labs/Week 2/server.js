let http = require('http');
let fs = require('fs');
let url = require('url');
let fileName = 'index.html';
/**
 * 
 * @param {day} d 
 * @param {month} m 
 * @param {year} y 
 * @returns week number since August 3,2020; returns -1 if the input is before 3rd of August 2020
 */
function getDaysDiff(d, m, y) {
    let returnValue = -1;
    let currentDay = new Date();
    currentDay.setDate(parseInt(d));
    currentDay.setMonth(parseInt(m) - 1); // months start from 0
    currentDay.setYear(parseInt(y));
    let firstDay = new Date("8/3/2020"); // first day in semester 2
    if (currentDay >= firstDay) {
        var diffDays = parseInt((currentDay - firstDay) / (1000 * 60 * 60 * 24)); //gives day difference 
        returnValue = (Math.floor(diffDays / 7) + 1);
    }
    return (returnValue);
}
http.createServer(function (request, response) {
    let q = url.parse(request.url, true).query;
    let pth = url.parse(request.url,true).pathname;
    console.log('request ', pth);
    var msg="";
    
    

    switch (pth) {
        case '/':
            fileName = 'index.html';
            break;
        case '/assessments':
            fileName = 'assessments.html';
            break;
        case '/topics':
            fileName = 'topics.html';
            break;
        case '/contact%20us':
            fileName='contact.html'
            break;
        case '/whichweek':
        case '/whichweek/':
            fileName = 'whichweek.html';
            


            let weekNo = getDaysDiff(q.d,q.m,q.y);
            if (isNaN(q.d)||isNaN(q.y)||isNaN(q.m)){
                msg="Invalid Date Entered";
            }
            else if (0>=weekNo){
                msg+="Error, week is before semester start date of the 3rd of August";
            }
            else if ( weekNo>14){
                msg+="Error, week is after semester end date of the 6th of November";
            }
            else {
                console.log("if");
                msg+= "Week "+weekNo;
                
            }
            
            break;
        default:
            fileName = 'error.html';
            break;
    }
    fs.readFile(fileName, function (error, content) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(content, 'utf-8');
        response.end(msg);
    });





}).listen(8081);
console.log('Server running at http://127.0.0.1:8080/');