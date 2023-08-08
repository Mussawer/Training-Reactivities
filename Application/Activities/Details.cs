using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Response<Activity>>{
            public Guid Id {get; set;} 
        }

        public class Handler : IRequestHandler<Query, Response<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Response<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                //if found send the activity if not then send nulls
                var activity =  await _context.Activities.FindAsync(request.Id);
                return Response<Activity>.Success(activity);
            }
        }
    }
}