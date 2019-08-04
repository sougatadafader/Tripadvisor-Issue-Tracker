    let BASE_URL = "https://api.github.com/repos/facebook/react/issues";
export default class IssueService{

    async  fetchIssues (){
         let response = await fetch(BASE_URL);
         let data =  await response.json();
        //console.log(JSON.stringify( data))
         return data;
    }

    async  fetchIssue (issueID){
        let issueUrl = BASE_URL + "/" + issueID ;
        let response = await fetch(issueUrl);
        let data =  await response.json();
        //console.log(JSON.stringify( data))
        return data;
    }

    fetchComments = async (issueID) => {
        let commentsUrl = BASE_URL + "/" + issueID + "/comments";
        let response = await fetch(commentsUrl);
        let data = await response.json();
        //console.log(JSON.stringify( data))
        return data;
    }


}