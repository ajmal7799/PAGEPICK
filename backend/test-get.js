fetch('http://localhost:5000/api/pdf/1777702540543-Day 1.pdf')
  .then(res => {
    console.log('Status Base File:', res.status);
    console.log('Headers:', [...res.headers.entries()]);
  })
  .catch(err => console.error(err));
