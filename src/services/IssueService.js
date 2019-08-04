    let BASE_URL = "https://api.github.com/repos/facebook/react/issues";
export default class IssueService{

    async  fetchIssues (){
         let response = await fetch(BASE_URL);
         let data =  await response.json();
        //console.log(JSON.stringify( data))
         return data;
    }

    fetchComments = async (commentID) => {
        let commentsUrl = BASE_URL + "/" + commentID + "/comments";
        let response = await fetch(commentsUrl);
        let data = await response.json();
        //console.log(JSON.stringify( data))
        return data;
    }


}