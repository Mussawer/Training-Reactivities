using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // this means that it already has api attributes
    // it has root and its deriving from controller base 
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        // to query our database we need to utilize dependency injection so that we can
        // inject our data context inside our API controller class
        // injecting dependency as parameter inside constructor 

        //so when http request comes in, program class send this request to this
        // class and create new instance and then it sees it requires Datacontext
 
        [HttpGet] //api/activities
        public async Task<IActionResult> GetActivities(){
            // we use send method of mediator this query to mediator handler   
            // api controller is sending request to our go between mediator
            // to application project that returns list of activities
            // back to api controller which is then send inside of an HTTp response to the client
            var result = await Mediator.Send(new ActivitiesList.Query());
            return HandleResult(result);
        }

        [HttpGet("{id}")] //api/activities/id
        public async Task<IActionResult> GetActivity(Guid id){
            var result = await Mediator.Send(new Details.Query{Id = id}); 
            return HandleResult(result);
        }

        [HttpPost]
        //Api controller in BaseApiController is smart enough to recognize that it need to look
        // inside body of the request to get Acrtivity object and compare the properties and if they match
        // it create it
        public async Task<IActionResult> CreateActivity(Activity activity){
            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity){
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}