using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Response<ActivityDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<ActivityDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Response<ActivityDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                //if found send the activity if not then send nulls
                var activity = await _context.Activities
                .ProjectTo<ActivityDTO>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);
                return Response<ActivityDTO>.Success(activity);
            }
        }
    }
}