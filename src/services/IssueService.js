let BASE_URL = "https://api.github.com/repos/facebook/react/issues";
export default class IssueService {

    /*
     returns issues fetched from the BASE_URL
    */
    async fetchIssues() {
        let response = await fetch(BASE_URL);
        let data = await response.json();
        return data;
    }

    /*
    @param issueId => the ID of the issue whose details needs to be fetched
     returns particular issue fetched from the BASE_URL
    */
    async fetchIssue(issueID) {
        let issueUrl = BASE_URL + "/" + issueID;
        let response = await fetch(issueUrl);
        let data = await response.json();
        return data;
    }

    /*
    @param issueId => the ID of the issue whose comments needs to be fetched
     returns comments of that particular issue fetched from the BASE_URL
    */
    fetchComments = async (issueID) => {
        let commentsUrl = BASE_URL + "/" + issueID + "/comments";
        let response = await fetch(commentsUrl);
        let data = await response.json();
        return data;
    }


}