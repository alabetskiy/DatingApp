using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest=>dest.Age, opt => 
                {
                    opt.MapFrom(src => src.DateOfBirth.ConvertDateTimeToInt());
                });


            CreateMap<User, UserForDetailedDto>()
             .ForMember(dest => dest.PhotoUrl, opt =>
                {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest=>dest.Age, opt => 
                {
                    opt.MapFrom(src => src.DateOfBirth.ConvertDateTimeToInt());
                });

            CreateMap<Photo, PhotosForDetaildDto>();

            CreateMap<UserForUpdateDto,User>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>(); //From UserForRegisterDto -> User
            CreateMap<MessageForCreatingDto, Message>().ReverseMap();
            CreateMap<Message,MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url)) //for SenderPhotoUrl. 
                .ForMember(m => m.RecipientPhotoUrl, opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url)); //for RecipientPhotoUrl
           
        }
    }
}