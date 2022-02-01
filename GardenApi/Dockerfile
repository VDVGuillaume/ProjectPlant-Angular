
#Appconfig
FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base

WORKDIR /app
EXPOSE 44390


FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["./GardenApi/GardenApi.csproj", "."]
RUN dotnet restore "GardenApi.csproj"
COPY ./GardenApi .
WORKDIR "/src/"
RUN dotnet build "GardenApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GardenApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GardenApi.dll"]