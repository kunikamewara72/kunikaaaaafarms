const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Room = require('../models/Room');
const Experience = require('../models/Experience');
const Review = require('../models/Review');

const seedData = async () => {
  try {
    // Seed Admin User with real host avatar from Airbnb
    const adminEmail = 'admin@grihumfarms.com';
    let admin = await User.findOne({ email: adminEmail });
    const passwordHash = await bcrypt.hash('admin123', 10);
    const hostAvatar = 'https://a0.muscache.com/im/pictures/user/User/original/3f877254-66fa-47be-b1d1-b7f5c5f5b205.jpeg';
    
    if (!admin) {
      await User.create({
        name: 'Kumawat Rythem (Host)',
        email: adminEmail,
        phone: '+91 98290 12345',
        passwordHash,
        role: 'admin',
        avatar: hostAvatar
      });
    } else {
      admin.avatar = hostAvatar;
      await admin.save();
    }

    // Reset & Seed Rooms with real Airbnb photos
    await Room.deleteMany({});
    await Room.create([
      {
        slug: 'water-spring-suite',
        name: 'Water Spring Suite',
        subtitle: 'Overlooking the natural waterfall stream with private wooden deck',
        description: 'The Water Spring Suite at Grihum Farms offers a serene sanctuary where the natural waterfall trickles right outside your window. Features a plush king bed, handcrafted teak furniture, private ensuite bathroom, and floor-to-ceiling glass paneling looking out over lush green palms and hills.',
        shortDescription: '4 Guests · 1 Bedroom · 1 King Bed · 1 Bathroom · Natural Stream View',
        capacity: { adults: 2, maxGuests: 4 },
        bedrooms: 1,
        beds: '1 King Bed + 2 Floor Mattresses',
        bathrooms: 1,
        pricePerNight: 7000,
        weekendPricePerNight: 7000,
        coverImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/618bd0dd-a9c4-4292-90ec-661e9a2ad514.jpeg',
        images: [
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/618bd0dd-a9c4-4292-90ec-661e9a2ad514.jpeg',
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/8484b012-9ce3-4c36-905d-6e0325643023.jpeg',
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/769f753f-6355-4eb5-9e88-24036c1f1b3b.jpeg',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200'
        ],
        amenities: [
          'Natural Waterfall View', 'Air Conditioning', 'Private Ensuite Bath',
          'Hot Water 24/7', 'Dedicated Workspace', 'Tea & Coffee Maker', 'Private Balcony'
        ],
        features: ['Sound of natural spring water', 'Sunlit breakfast corner', 'Organic toiletries'],
        status: 'active',
        blockedDates: ['2026-09-10', '2026-09-11']
      },
      {
        slug: 'mountain-view-cottage',
        name: 'Mountain View Cottage',
        subtitle: 'Panoramic views of the Aravalli hills with high rustic vaulted ceilings',
        description: 'Soak in breathtaking mountain vistas from your private stone cottage balcony. Built with natural clay tiles, local granite, and reclaimed timber, this space captures the authentic countryside elegance of Udaipur.',
        shortDescription: '4 Guests · 1 Bedroom · 1 King Bed · 1 Bathroom · Aravalli Hill View',
        capacity: { adults: 2, maxGuests: 4 },
        bedrooms: 1,
        beds: '1 King Bed + 2 Extra Mattresses',
        bathrooms: 1,
        pricePerNight: 7000,
        weekendPricePerNight: 7000,
        coverImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/8484b012-9ce3-4c36-905d-6e0325643023.jpeg',
        images: [
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/8484b012-9ce3-4c36-905d-6e0325643023.jpeg',
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/618bd0dd-a9c4-4292-90ec-661e9a2ad514.jpeg',
          'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=1200'
        ],
        amenities: [
          'Aravalli Mountain View', 'Air Conditioning', 'Hot Water', 'Coffee Station', 'Wardrobe'
        ],
        features: ['High vaulted wooden ceilings', 'Sunset viewpoint balcony', 'Peaceful seclusion'],
        status: 'active',
        blockedDates: []
      },
      {
        slug: 'entire-farmhouse',
        name: 'Entire Grihum Farms Villa',
        subtitle: 'Complete private access to the entire 3-bedroom villa with 2 lofts with beds, spring pool & gardens',
        description: 'Experience complete exclusivity at Grihum Farms for your family or group. Includes 3 bedrooms and 2 lofts with beds, plus full access to the natural spring pool, open kitchen, garden dining area, outdoor firepit, and dedicated staff to make your stay effortless.',
        shortDescription: 'Up to 16 Guests · 3 Bedrooms · 2 Lofts with Beds · 2 Bathrooms · Private Spring Pool',
        capacity: { adults: 16, maxGuests: 16 },
        bedrooms: 3,
        beds: 'Beds in 3 Bedrooms + 2 Lofts',
        bathrooms: 2,
        pricePerNight: 21000,
        weekendPricePerNight: 21000,
        coverImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/769f753f-6355-4eb5-9e88-24036c1f1b3b.jpeg',
        images: [
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/769f753f-6355-4eb5-9e88-24036c1f1b3b.jpeg',
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/618bd0dd-a9c4-4292-90ec-661e9a2ad514.jpeg',
          'https://a0.muscache.com/im/pictures/hosting/Hosting-1025782635785916174/original/8484b012-9ce3-4c36-905d-6e0325643023.jpeg'
        ],
        amenities: [
          'Private Water Spring Pool', 'Full Kitchen Access', 'Outdoor Firepit & Garden',
          'Air Conditioning in all rooms', 'Free Parking for 5 Cars', 'Pet Friendly', 'Authentic Cook on Request'
        ],
        features: ['100% private grounds', 'Natural spring water pool', 'Evening outdoor dining setup'],
        status: 'active',
        blockedDates: []
      }
    ]);
    console.log('🌱 Updated Grihum Farms rooms with authentic listing photos');

    // Seed Experiences
    const expCount = await Experience.countDocuments();
    if (expCount === 0) {
      await Experience.create([
        {
          slug: 'rajasthani-thali-dining',
          title: 'Authentic Rajasthani Traditional Thali',
          shortDescription: 'Home-cooked traditional meal with organic ghee, Dal Baati Churma, and fresh farm salad.',
          description: 'Savor traditional Rajasthani flavors prepared by local village cooks using firewood stoves and organic seasonal ingredients directly harvested from nearby fields.',
          image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&q=80&w=1000',
          duration: '1.5 Hours',
          price: 850,
          priceUnit: 'per person',
          category: 'Culinary'
        },
        {
          slug: 'natural-waterfall-bonfire',
          title: 'Stargazing & Natural Waterfall Bonfire',
          shortDescription: 'Cozy bonfire under the clear Aravalli night sky with acoustic music & warm herbal tea.',
          description: 'As twilight settles over Grihum Farms, gather around the stone firepit beside the trickling spring water for an unforgettable evening under the stars.',
          image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1000',
          duration: '2 Hours',
          price: 1200,
          priceUnit: 'per group',
          category: 'Evening'
        },
        {
          slug: 'organic-farm-breakfast',
          title: 'Farm-to-Table Organic Breakfast',
          shortDescription: 'Fresh farm eggs, herbal infusions, handcrafted bread, millet porridge, and seasonal fruits.',
          description: 'Wake up to the sound of chirping birds and enjoy a nutritious, wholesome breakfast served outdoors under the shade of neem and mango trees.',
          image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&q=80&w=1000',
          duration: '1 Hour',
          price: 550,
          priceUnit: 'per person',
          category: 'Culinary'
        },
        {
          slug: 'guided-nature-birdwalk',
          title: 'Guided Aravalli Nature Trail & Birdwatching',
          shortDescription: 'Morning nature walk through surrounding hills with a local guide pointing out native flora & fauna.',
          description: 'Explore hidden streams, natural rock formations, and over 40 species of resident birds in the serene countryside around Grihum Farms.',
          image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1000',
          duration: '2 Hours',
          price: 700,
          priceUnit: 'per group',
          category: 'Outdoor'
        }
      ]);
    }

    // Reset & Seed Reviews with real Kumawat Rythem host details
    await Review.deleteMany({});
    await Review.create([
      {
        guestName: 'Ananya Sharma',
        guestLocation: 'Mumbai, Maharashtra',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        stayDate: 'August 2026',
        roomName: 'Water Spring Suite',
        comment: 'Grihum Farms is an absolute paradise! The sound of the natural waterfall right outside the room made sleeping so restful. Kumawat Rythem is an extraordinary host — the traditional food was the highlight of our Udaipur trip.'
      },
      {
        guestName: 'Vikram & Radhika Mehta',
        guestLocation: 'Delhi NCR',
        avatar: 'https://images.unsplash.com/photo-1507038772120-7fff76f79d79?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        stayDate: 'July 2026',
        roomName: 'Entire Grihum Farms Villa',
        comment: 'We booked the entire villa for a family reunion. The private natural spring pool and bonfire evening under the stars were unforgettable. Very clean, quiet, and genuine hospitalty.'
      },
      {
        guestName: 'Siddharth Rao',
        guestLocation: 'Bengaluru, Karnataka',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        rating: 5,
        stayDate: 'June 2026',
        roomName: 'Mountain View Cottage',
        comment: 'If you want to escape the crowded city noise of Udaipur and immerse yourself in raw mountain nature, this is the place. Waking up to Aravalli hill views was magical.'
      }
    ]);
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
