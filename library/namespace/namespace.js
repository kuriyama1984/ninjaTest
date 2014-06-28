(function(global, namespace) {
  
    /**
     * Mechanism and Approach Maps for Social Activity (MAMSA)
     * mod source
     * http://notame.hatenablog.com/entry/2014/04/08/144316
     */ 
    function Namespace(str) {
        var ns = str.split('.');
        var here = global;
        for (var i = 0, l = ns.length; i < l; i++){
            if (typeof(here[ns[i]]) == 'undefined') here[ns[i]] = {};
            here = here[ns[i]];
        }
        return here;
    }
       
    var ns = Namespace(namespace);
    ns.addNamespace = Namespace;

}(this, "mamsa"));