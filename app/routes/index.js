const htmlString = `
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><meta http-equiv="X-UA-Compatible" content="ie=edge" /><title>Document</title></head><body>
<p>
  This is a very simple test harness which posts to <a href="/api/fileanalyse">/api/fileanalyse</a> Take a look at <i>View page source</i> to see how it works.
</p>
<form action="" id="file-form" enctype="multipart/form-data">
<input type="file" name="uploadFile" />
<input type="submit" value="Upload" />
</form>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>
  $(function () {
    var files;
    $('input[type=file]').on('change', function (e) {
      files = e.target.files;
    });
    $('form').on('submit', function (e) {
      e.stopPropagation();
      e.preventDefault();

      var data = new FormData();
      $.each(files, function (key, value) {
        data.append('uploadFile', value)
      });
      $.ajax({
        url: window.location.origin + '/api/fileanalyse/',
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
        success: function (data) {
          alert('FILE SIZE: ' + data.fileSize)
        },
        error: function (xhr, status, err) {
          alert('Error: ' + status)
        }
      })
    })
  })
</script>
</body></html>
`
const htmlBuffer = new Buffer(htmlString)

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(htmlBuffer)
  })
  app.use('/api', require('./api'))
  app.use((req, res) => {
    if (!res.headersSent) res.status(404).send('404 Not Found')
  })
}
