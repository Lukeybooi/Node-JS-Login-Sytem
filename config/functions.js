module.exports = {
    testConnection(mongoose) {
        let db = mongoose.connection;

        db.on('error', (err) => {
            console.log(err);
            return false;
        });

        db.once('open', () => {
            console.log('DATABASE INITIALIZED..');
        });

        return true;
    }
};