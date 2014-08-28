var ngwatchers = function (verbose) {

    var root = $(document.getElementsByTagName('body'));
    var watchers = [];

    var f = function (element) {
        if (element.data().hasOwnProperty('$scope')) {
            angular.forEach(element.data().$scope.$$watchers, function (watcher) {
                watchers.push(watcher);
                if (verbose) {
                    var expOrName = 'exp';
                    var exp = watcher.exp;
                    if (angular.isFunction(exp)) {
                        if (typeof exp.exp !== 'undefined') {
                            exp = exp.exp;
                        } else if (typeof exp.name !== 'undefined') {
                            exp = exp.name;
                            expOrName = 'name';
                        }
                    }
                    console.log('Last: "' + watcher.last + '", ' + expOrName + ': "' + exp + '"');
                }
            });
        }

        angular.forEach(element.children(), function (childElement) {
            f($(childElement));
        });
    };

    f(root);

    console.log(watchers.length);
};