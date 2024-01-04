import requests


r = requests.post(
    "http://localhost:3000/escort/profile",
    json=dict(
        modelName="Alice",
        country="United States",
        city="New York",
        image="alice.jpg",
        description="Experienced model with a passion for fashion.",
        profileType="Fashion",
        age=25,
        weight=130,
        height=5.8,
        availableFor="Photo shoots, Runway, Events",
        breastSize=34,
        breastType="Natural",
        nationality="American",
        languages=["English", "Spanish"],
        travel="Available for travel",
        piercing="No",
        tatoo="No",
        services="Modeling, Fashion Consultation",
        isPornStar=False,
        cellPhones=["123-456-7890", "987-654-3210"],
        meetingWith="Clients, Designers",
    ),
)
print(r)