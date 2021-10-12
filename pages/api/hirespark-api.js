// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  fetch(req.query.url).then((data) => {
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
    
    res.status(200).json(result)
  })
}
