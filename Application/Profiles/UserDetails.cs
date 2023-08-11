using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class UserDetails
    {
        public class Query : IRequest<Response<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Response<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            //injecting mapper to map user object to profile object
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;

            }

            public async Task<Response<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                //we want to include user we can do that by eager loading 
                // but we also need to return profile so thats why used project to
                var user = await _context.Users
                    .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x=> x.UserName == request.Username); 

                return Response<Profile>.Success(user);
            }
        }
    }
}