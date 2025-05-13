using System;
using Application.Profiles.Commands;
using FluentValidation;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace Application.Profiles.Validators;

public class EditProfileValidator : AbstractValidator<EditProfile.Command>
{
    public EditProfileValidator()
    {  
        RuleFor(u=>u.DisplayName).NotEmpty().WithMessage("The display name is required");
    }
}
