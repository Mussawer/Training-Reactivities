using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    // this means that it already has api attributes
    // it has root and its deriving from controller base 
    public class ActivitiesController : BaseApiController
    {
        // to query our database we need to utilize dependency injection so that we can
        // inject our data context inside our API controller class
        // injecting dependency as parameter inside constructor 

        //so when http request comes in, program class send this request to this
        // class and create new instance and then it sees it requires Datacontext
        private readonly DataContext _context;        
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }
 
        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            return await _context.Activities.ToListAsync();
        }

        [HttpGet("{id}")] //api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await _context.Activities.FindAsync(id);
        }
    }
}