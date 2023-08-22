using System.Linq;
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
        public class Query : IRequest<Response<PagedList<ActivityDTO>>>
        {
            public ActivityParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<PagedList<ActivityDTO>>>
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
            public async Task<Response<PagedList<ActivityDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // so this is mediator query which forms a request that we pass to our handler
                //  and return the data that we are looking for inside this IRequest interface
                var query = _context.Activities
                    .Where(d => d.Date >=request.Params.StartDate)
                    .OrderBy(d => d.Date)
                    // eager loading causes bad performance for that we should use projectto
                    .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                    // .Include(a => a.Attendees)
                    // .ThenInclude(u => u.AppUser)
                    .AsQueryable();
                
                if(request.Params.IsGoing && !request.Params.IsHost)
                {
                    query = query.Where(x=>x.Attendees.Any(a => a.UserName == _userAccessor.GetUserName()));
                }

                if(request.Params.IsHost && !request.Params.IsGoing){
                    query = query.Where(x=>x.HostUsername == _userAccessor.GetUserName());
                }

                return Response<PagedList<ActivityDTO>>.Success(
                    await PagedList<ActivityDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }

    }
}