var query = {

    cleanQuery: function (query) {
        var query_clean = query;
        for (const i in query_clean) {
          if (typeof (query_clean[i]) == "string") {
            if (query_clean[i].indexOf("'")) {
              query_clean[i] = query_clean[i].replace("'", "''");

            }
          }
        }
        return query_clean;
      },

      WhereSql(where){
        var whereSend =[]
          if(where==""){return whereSend}
          else{
              for (const[key,value] of Object.entries(where)){
                  (typeof value == "number" ) ? whereSend.push(key+" = "+value) : null;
                  (typeof value == "string" ) ? whereSend.push(key+" = '"+value+"'") : null;
                  (Array.isArray(value)) && value.length>0 ? whereSend.push(key+" IN("+value.join(",")+")") : null;
  
              }
  
          return whereSend
          }
  
      },
      UpdateSql(update){
        var updateSend = []
        if(update != ""){
  
                for (const[key,value] of Object.entries(update)){
  
                    (typeof value == "number" ) ? updateSend.push(key+" = "+value) : null;
                    (typeof value == "string" ) ? updateSend.push(key+" = '"+value+"'") : null;
                    (typeof value == "object") ? updateSend.push(key+" = '"+JSON.stringify(value)+"'") : null;
                  }
            return updateSend
        }else{
          return []
        }
  
      },
}

module.exports = query;