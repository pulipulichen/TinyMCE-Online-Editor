if (!String.prototype.endsWith)
    String.prototype.endsWith = function (searchStr, Position) {
        // This works much better than >= because
        // it compensates for NaN:
        if (!(Position < this.length))
            Position = this.length;
        else
            Position |= 0; // round position
        return this.substr(Position - searchStr.length,
                searchStr.length) === searchStr;
    };
  
generate_time_string = function () {
    var d = new Date();
    var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
    var local = new Date(utc);
    return local.toJSON().slice(0,19).replace(/:/g, "-");
};