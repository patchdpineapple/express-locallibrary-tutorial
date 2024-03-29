const { DateTime } = require("luxon");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// Virtual for author's full name
AuthorSchema
.virtual("name")
.get(function() {
    return this.family_name + ", " + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual("lifespan")
.get(function() {
    if(this.date_of_birth && this.date_of_death) {
        return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
    } else {
        return "";
    }
    
});

// Virtual for author's url
AuthorSchema
.virtual("url")
.get(function() {
    return "/catalog/author/" + this._id;
});

AuthorSchema
.virtual("date_of_birth_formatted")
.get(function() {
    return this.date_of_birth ? 
    DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) 
    : "";
});

AuthorSchema
.virtual("date_of_death_formatted")
.get(function() {
    return this.date_of_death ? 
    DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) 
    : "";
});

AuthorSchema
.virtual("date_of_birth_form")
.get(function() {
    return this.date_of_birth ? 
    DateTime.fromJSDate(this.date_of_birth).toISODate() 
    : "";
});

AuthorSchema
.virtual("date_of_death_form")
.get(function() {
    return this.date_of_death ? 
    DateTime.fromJSDate(this.date_of_death).toISODate() 
    : "";
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);

