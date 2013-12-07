
/**
 * disjoin
 * 
 * usage:
 * var aNotInB = $.disjoin(a,b);
 * var bNotInA = $.disjoin(b,a);
 * 
 * @param array a, array b
 * @returns array of elements in a but not in b.
 */
$.disjoin = function(a, b) {
    return $.grep(a, function($e) { return $.inArray($e, b) == -1; });
};



//var aNotInB = $.disjoin(a,b);
//var bNotInA = $.disjoin(b,a);