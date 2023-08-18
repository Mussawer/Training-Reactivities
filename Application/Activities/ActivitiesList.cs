using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ActivitiesList
    {
        public class Query : IRequest<Response<List<ActivityDTO>>> { }

        public class Handler : IRequestHandler<Query, Response<List<ActivityDTO>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;

            }
            public async Task<Response<List<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // so this is mediator query which forms a request that we pass to our handler
                //  and return the data that we are looking for inside this IRequest interface
                var activities = await _context.Activities
                    // eager loading causes bad performance for that we should use projectto
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    // .Include(a => a.Attendees)
                    // .ThenInclude(u => u.AppUser)
                    .ToListAsync(cancellationToken);
                
                return Response<List<ActivityDTO>>.Success(activities);
            }
        }

    }
}