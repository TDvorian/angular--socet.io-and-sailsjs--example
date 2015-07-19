/**
 * StatementController
 *
 * @description :: Server-side logic for managing statements
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
}
module.exports = {
    create: function(req, res) {
        var datetime = Math.floor(Date.now());



        var params = {
            description: req.param('description'),
            author: req.param('author'),
            title: req.param('title'),
            date: (new Date()).toMysqlFormat(),
        }

        Statement.create(params).exec(function(err, statement) {
            console.log(err);
            if (err) {
                res.send(400, {
                    description: err
                });
            } else {
                res.send({
                    id: statement.id
                });
            }
        });

    },
    update: function(req, res) {
        var Id = req.param('id');

        var elem = {
            description: req.param('description'),
            title: req.param('title'),
        };

        Statement.update(Id, elem).exec(function(err) {
            if (err) {
                res.send(400, {
                    description: err
                });
            } else {
                res.send({
                    id: Id
                });
            }
        });

    },
    delete: function(req, res) {
        var Id = req.param('id');
        Statement.destroy(Id).exec(function(err) {
            if (err) {
                res.send(400, {
                    description: err
                });
            } else {
                res.send({
                    id: Id
                });
            }
        });
    },
    index: function(req, res) {
        var sort = req.param('sort');
        var sortType = req.param('sortType')
        if (!sort) {
            sort = 'id';
        }else{
		if((sort!="title")||(sort!="date")){
			sort = 'id';
		}
		
		}
        if (sortType == 'DESC') {
            sortType = 'DESC';
        } else {
            sortType = 'ASC';
        }
        Statement.find()
            .sort(sort + ' ' + sortType)
            .exec(function(err, statements) {
                if (err) {
                    res.send(400, {
                        description: err
                    });
                } else {
                    res.send({
                        statements: statements,
                        count: statements.length
                    });
                }

            });
    },


};