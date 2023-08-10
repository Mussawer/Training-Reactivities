using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDTO>()
            .ForMember(d => d.HostUsername, opt => opt.MapFrom(s => s.Attendees
            .FirstOrDefault(x => x.IsHost).User.UserName));
            
            CreateMap<ActivityAttendee, Profiles.Profile>()
            .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.UserName, opt => opt.MapFrom(s => s.User.UserName))
            .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.User.Bio));
        }
    }
}