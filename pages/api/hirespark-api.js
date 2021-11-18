// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch(req.query.url, {
    headers: new Headers({
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
    }),
  }).then((data) => {
    return data.text()
  }).then((response) => {
    var content = String(response).match(/appConfig = JSON\.parse\('(.*)\'\);/)
    var result = content[1].replace(/\\/g, '');
    var json = JSON.parse(result);
    var result = {
      author: json.shareLink.created_by,
      interview: {
        person: json.shareLink.interviews[0].candidate,
        questions: json.shareLink.interviews[0].questions.map(function (question) {
          return {
            question: question.text,
            video: question.video_answer.sources.mp4
          }
        })
      }
    }
    console.log(result)
    res.status(200).json(result)
  })
}
