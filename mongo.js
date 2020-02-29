function testFn() {
    const mongoose = require('mongoose');
mongoose.connect('mongodb://database:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
console.log("In mongo!");
const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
}
module.exports = {test: testFn}
