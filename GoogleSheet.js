var server = "sql12.freemysqlhosting.net";
var dabname = "sql12614141";
var username = "sql12614141";
var password = "vYJyEPFEFN";
var port = "3306";

function sheettosql() {
    var instanceUrl = "jdbc:mysql://"+server + ":" + port+"/"+dabname;
    const conn = Jdbc.getConnection(instanceUrl, username, password);
    const stmt = conn.createStatement();
  
    var doc = SpreadsheetApp.getActiveSpreadsheet() ;
    var sheet = doc.getSheetByName("player");
    var values = sheet.getDataRange().getValues();

     var results = stmt.execute("DROP TABLE abcd");
     let query = "CREATE TABLE abcd(player_name varchar(50)"


      Logger.log(values[0].length);
     for(var i=1; i<values[0].length; ++i)
     {
        query +=",match"+String(i) + " int";
     }

     query += ")";

     Logger.log(query);
    results = stmt.execute(query);


    for(var i = 1; i<values.length; i++) {
      
      if(!values[i])
        break;
      let a = values[i][0];
      query = 'INSERT INTO abcd VALUES (';
      query+='"'+a+'"';
      for(var j=1; j<values[i].length; ++j)
      {
        query+=", ";
        query+=String(values[i][j]);
      }
      query+=")";

      results = stmt.execute(query);

      Logger.log(query);

    }

    results = stmt.execute("select *from abcd");
    Logger.log(results);


    conn.close();
}