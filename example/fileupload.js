const files = {
    "input-1": [
        "Name, Email, Phone, Address",
        "Sam, sam@xyz.com,0123498765,HomeAddress"
    ],
    "input-2": [
        "Name, Email, Phone, Address",
        "Yam, Yam@xyz.com,0123498766,HomeAddress"
    ],
    "input-3": [
        "Name, Email, Phone, Address",
        "Ram, Ram@xyz.com,0123498767,HomeAddress"
    ]
}

describe('uploading', () => {

    for (const [file, data] of Object.entries(files)) {

        it(`file ${file} should pass`, (done) => {

            chai.request(app)
                .post('/endpoint')
                // create file dynamically
                .attach('file', Buffer.from(data, 'utf-8'), {
                    // add file info accordingly
                    filename: `${file}.txt`,
                    contentType: 'text/plain',
                    knownLength: data.length
                })
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    expect(res).to.have.status(200);
                    done();
                })
        });
    }

});