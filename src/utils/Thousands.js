export const Thousands = function(num) {
  var res = num.toString().replace(/\d+/, function(n){
    return n.replace(/(\d)(?=(\d{3})+$)/g, function($1){
      return $1+",";
    })
  })
  return res;
}