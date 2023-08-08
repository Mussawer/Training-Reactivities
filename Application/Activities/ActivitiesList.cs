using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ActivitiesList
    {
        public class Query : IRequest<Response<List<Activity>>> {}

        public class Handler : IRequestHandler<Query, Response<List<Activity>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Response<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // so this is mediator query which forms a request that we pass to our handler
                //  and return the data that we are looking for inside this IRequest interface
               var result = await _context.Activities.ToListAsync();
               return Response<List<Activity>>.Success(result);
            }
        }

    }
}