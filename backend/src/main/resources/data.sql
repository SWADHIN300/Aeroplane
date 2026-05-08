-- NexFly Seed Data - Indian Airports from Every State
-- Uses ON CONFLICT DO NOTHING to avoid duplicates on restart.

-- DESTINATIONS
INSERT INTO destinations (id, city, region, tagline, image_url, price_inr) VALUES
(1, 'Dubai', 'EMIRATES', 'The city of tomorrow, today.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1JjpvLibaeCOMwl3jkBph8y_zHT4InyhpHLAqSFElYbIv_XVoXMT3aiMzfg69Xe397EdFUeQe6FHAZqEkg8fF_v0M5QF9FyA5G5DEKJcLHwqcCjE8Nyae4goBg8rQ-VvASGA9qrlbjS9jEARWuU16b_vzGxTH-GbwN_FFC4YTeO1DMTwqYVx_ixV8xDT4ppyE-YzyitUy6TWTMPZvBbASEyK1QqJZzedwfqP566sREiXsunv1Y-TBiVoV7FzRTOvOvsmRWy3CKbmX', 99900),
(2, 'Singapore', 'ASIA', 'Lush green meets neon dreams.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcdYQQ8PftyBLlmkIXvrcz1z9QYbzEf3HIk4PDbsrOnsfauN6z72irD-ry8dUD0l3iMfkhbnHGhHs1Dh_q9sFVBpJovpytpR3YFOr86A1nC1iHCOu86d9wMfv2eIixM8ENl4TmapqScjoMgdQGJeTvPJVo1spgRBJzUl7zwpfn79oK-u4hHPCqQvrvWH61P4hTpB5i_YtFQbbBPTMzR9MmY6NwZavzMjR6_MZ6hp8pbo64ZZckUuoL3vcPOGu9bX5lgmPbOz187zvT', 79000),
(3, 'Tokyo', 'JAPAN', 'Where tradition fuels innovation.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkKFx0fEAqYMxpPoM8_3h8TUucZi1CltcLFX10gJh2Ol0tQcAZS4iObHMwVMDeRqb-7AwMBGivDWvx2pDV3aomGeaO3tFeUZOBlq_b5ofJ2Ut8nSwlmMSmUG8iSZgxuSmCxvFWjiKdTyUvoWXddHc1sG06MOdevvlZn9-5utL3umsBPSx9kddNwvK2gA2kCWZTSyMrOjKQ7FKbmLn0zPZjNncE9q_FIJ_jtSf2jLaRA00kP2d4a8maOmfcf52ZHn3VH67jcgROdvtk', 91500),
(4, 'Kyoto', 'CULTURE', 'Ancient temples, modern soul.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmKv7nxkQnyJbb6mlkPpwitUGDVwQvwYOF7p2S3-rJwsMB2tmMK-DpWvpatTHwY6oAbPwnkQbeezfdJmXBowAARZTqsKP0S7KL-6mlSUDxuyVi__lI-IXwBrMEudIBp8Z3kOg6On_5H9KmF8Junh86tvLqU7cR1rjIJZjG_QaiSslId7ZHSTuUW3ub2KAqspqZv2vrtUr3Y_Tqsfewy2mW4zINR9yb3nacIfytDjl5oyuZKNNXvT1vu_ggNliBhC6VV7FofcpyLR7', 120000),
(5, 'Goa', 'INDIA', 'Sun, sand and serenity.', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800', 15000),
(6, 'Jaipur', 'RAJASTHAN', 'The Pink City of kings.', 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800', 8500),
(7, 'Srinagar', 'KASHMIR', 'Paradise on Earth.', 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800', 12000),
(8, 'Varanasi', 'SPIRITUAL', 'The eternal city of light.', 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800', 7500)
ON CONFLICT (id) DO UPDATE SET image_url = EXCLUDED.image_url;

-- FLIGHTS - Covering airports from every Indian state
INSERT INTO flights (id, airline, type, icon, departure_time, departure_code, departure_name, arrival_time, arrival_code, arrival_name, duration, stops, flight_class, price_inr, confirmed, amenities) VALUES
-- Delhi hub routes
(1, 'NexFly NF-802', 'Advanced Orbital', 'rocket_launch', '08:30', 'DEL', 'Indira Gandhi Intl', '10:45', 'BOM', 'Chhatrapati Shivaji', '2h 15m', 'Non-stop', 'Economy Plus', 18499, true, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."},{"icon":"wifi","text":"WiFi"}]'),
(2, 'StarLink SL-104', 'Sub-Orbital Jet', 'flight', '14:15', 'DEL', 'Delhi', '16:45', 'BOM', 'Mumbai', '2h 30m', 'Non-stop', 'Economy', 12200, false, '[{"icon":"luggage","text":"15KG"}]'),
(3, 'Vistara VX-210', 'Atmospheric Cruiser', 'airlines', '19:00', 'DEL', 'Delhi', '21:10', 'BOM', 'Mumbai', '2h 10m', 'Non-stop', 'Business', 24800, false, '[{"icon":"luggage","text":"30KG"},{"icon":"restaurant","text":"Gourmet"},{"icon":"wifi","text":"WiFi 6E"}]'),
(4, 'NexFly NF-330', 'Quantum Turbine', 'rocket_launch', '06:00', 'BOM', 'Mumbai', '08:30', 'DXB', 'Dubai Intl', '3h 30m', 'Non-stop', 'First Class', 45000, false, '[{"icon":"luggage","text":"40KG"},{"icon":"restaurant","text":"Fine Dining"},{"icon":"wifi","text":"WiFi"},{"icon":"chair","text":"Lie-Flat"}]'),
(5, 'AeroNex AN-777', 'Hypersonic Glider', 'flight', '22:00', 'DEL', 'Delhi', '06:30', 'LHR', 'Heathrow', '8h 30m', 'Non-stop', 'Business Executive', 68000, true, '[{"icon":"luggage","text":"35KG"},{"icon":"restaurant","text":"5-Star"},{"icon":"wifi","text":"WiFi 6E"},{"icon":"chair","text":"Suite"}]'),
-- Karnataka
(6, 'NexFly NF-410', 'Orbital Express', 'rocket_launch', '07:00', 'DEL', 'Delhi', '09:45', 'BLR', 'Kempegowda Intl', '2h 45m', 'Non-stop', 'Economy Plus', 16500, true, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
(7, 'NexFly NF-412', 'Orbital Express', 'rocket_launch', '11:30', 'BLR', 'Bengaluru', '14:00', 'DEL', 'Delhi', '2h 30m', 'Non-stop', 'Business', 22000, false, '[{"icon":"luggage","text":"30KG"},{"icon":"restaurant","text":"Gourmet"},{"icon":"wifi","text":"WiFi 6E"}]'),
-- Tamil Nadu
(8, 'StarLink SL-220', 'Sub-Orbital Jet', 'flight', '06:30', 'DEL', 'Delhi', '09:20', 'MAA', 'Chennai Intl', '2h 50m', 'Non-stop', 'Economy', 14200, false, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Snacks"}]'),
(9, 'NexFly NF-505', 'Quantum Turbine', 'rocket_launch', '10:00', 'MAA', 'Chennai', '12:15', 'CJB', 'Coimbatore Intl', '1h 15m', 'Non-stop', 'Economy Plus', 6800, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Telangana
(10, 'Vistara VX-340', 'Atmospheric Cruiser', 'airlines', '08:00', 'DEL', 'Delhi', '10:15', 'HYD', 'Rajiv Gandhi Intl', '2h 15m', 'Non-stop', 'Business', 19500, true, '[{"icon":"luggage","text":"30KG"},{"icon":"restaurant","text":"Meal Inc."},{"icon":"wifi","text":"WiFi"}]'),
-- Kerala
(11, 'NexFly NF-601', 'Orbital Express', 'rocket_launch', '09:00', 'DEL', 'Delhi', '12:30', 'COK', 'Cochin Intl', '3h 30m', 'Non-stop', 'Economy Plus', 17800, false, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
(12, 'StarLink SL-310', 'Sub-Orbital Jet', 'flight', '15:00', 'BOM', 'Mumbai', '17:00', 'TRV', 'Trivandrum Intl', '2h 00m', 'Non-stop', 'Economy', 11500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Gujarat
(13, 'NexFly NF-701', 'Quantum Turbine', 'rocket_launch', '07:30', 'DEL', 'Delhi', '09:00', 'AMD', 'Sardar Vallabhbhai Patel', '1h 30m', 'Non-stop', 'Economy Plus', 9800, true, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Snacks"}]'),
(14, 'Vistara VX-450', 'Atmospheric Cruiser', 'airlines', '12:00', 'BOM', 'Mumbai', '13:10', 'STV', 'Surat Airport', '1h 10m', 'Non-stop', 'Economy', 5500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Rajasthan
(15, 'NexFly NF-810', 'Orbital Express', 'rocket_launch', '08:00', 'DEL', 'Delhi', '09:00', 'JAI', 'Jaipur Intl', '1h 00m', 'Non-stop', 'Economy Plus', 6200, true, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Snacks"}]'),
(16, 'StarLink SL-415', 'Sub-Orbital Jet', 'flight', '14:00', 'DEL', 'Delhi', '15:30', 'UDR', 'Maharana Pratap', '1h 30m', 'Non-stop', 'Economy', 7800, false, '[{"icon":"luggage","text":"15KG"}]'),
-- West Bengal
(17, 'NexFly NF-901', 'Quantum Turbine', 'rocket_launch', '06:00', 'DEL', 'Delhi', '08:15', 'CCU', 'Netaji Subhas Chandra Bose', '2h 15m', 'Non-stop', 'Business', 21000, true, '[{"icon":"luggage","text":"30KG"},{"icon":"restaurant","text":"Gourmet"},{"icon":"wifi","text":"WiFi 6E"}]'),
(18, 'Vistara VX-560', 'Atmospheric Cruiser', 'airlines', '16:00', 'CCU', 'Kolkata', '18:00', 'IXB', 'Bagdogra', '1h 00m', 'Non-stop', 'Economy', 5200, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Punjab & Chandigarh
(19, 'NexFly NF-115', 'Orbital Express', 'rocket_launch', '09:30', 'DEL', 'Delhi', '10:30', 'ATQ', 'Sri Guru Ram Dass Jee', '1h 00m', 'Non-stop', 'Economy Plus', 5800, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Assam (Northeast)
(20, 'StarLink SL-520', 'Sub-Orbital Jet', 'flight', '07:00', 'DEL', 'Delhi', '09:45', 'GAU', 'Lokpriya Gopinath Bordoloi', '2h 45m', 'Non-stop', 'Economy', 15500, false, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
-- Goa
(21, 'NexFly NF-221', 'Quantum Turbine', 'rocket_launch', '10:00', 'DEL', 'Delhi', '12:15', 'GOI', 'Manohar Intl Goa', '2h 15m', 'Non-stop', 'Economy Plus', 13500, true, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."},{"icon":"wifi","text":"WiFi"}]'),
(22, 'Vistara VX-670', 'Atmospheric Cruiser', 'airlines', '08:00', 'BOM', 'Mumbai', '09:10', 'GOI', 'Goa Airport', '1h 10m', 'Non-stop', 'Economy', 6800, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Madhya Pradesh
(23, 'StarLink SL-625', 'Sub-Orbital Jet', 'flight', '11:00', 'DEL', 'Delhi', '12:20', 'IDR', 'Devi Ahilyabai Holkar', '1h 20m', 'Non-stop', 'Economy', 7200, false, '[{"icon":"luggage","text":"15KG"}]'),
(24, 'NexFly NF-340', 'Orbital Express', 'rocket_launch', '14:30', 'DEL', 'Delhi', '15:50', 'BHO', 'Raja Bhoj', '1h 20m', 'Non-stop', 'Economy Plus', 7500, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Uttar Pradesh
(25, 'NexFly NF-450', 'Quantum Turbine', 'rocket_launch', '07:00', 'DEL', 'Delhi', '08:10', 'LKO', 'Chaudhary Charan Singh', '1h 10m', 'Non-stop', 'Economy Plus', 5500, true, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Snacks"}]'),
(26, 'Vistara VX-780', 'Atmospheric Cruiser', 'airlines', '16:00', 'DEL', 'Delhi', '17:30', 'VNS', 'Lal Bahadur Shastri', '1h 30m', 'Non-stop', 'Business', 8200, false, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
-- Odisha
(27, 'StarLink SL-730', 'Sub-Orbital Jet', 'flight', '09:00', 'DEL', 'Delhi', '11:15', 'BBI', 'Biju Patnaik Intl', '2h 15m', 'Non-stop', 'Economy', 12800, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Bihar
(28, 'NexFly NF-560', 'Orbital Express', 'rocket_launch', '08:00', 'DEL', 'Delhi', '09:45', 'PAT', 'Jay Prakash Narayan', '1h 45m', 'Non-stop', 'Economy Plus', 9200, false, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Snacks"}]'),
-- Jharkhand
(29, 'Vistara VX-890', 'Atmospheric Cruiser', 'airlines', '13:00', 'DEL', 'Delhi', '15:00', 'IXR', 'Birsa Munda', '2h 00m', 'Non-stop', 'Economy', 10500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Chhattisgarh
(30, 'StarLink SL-840', 'Sub-Orbital Jet', 'flight', '10:30', 'DEL', 'Delhi', '12:20', 'RPR', 'Swami Vivekananda', '1h 50m', 'Non-stop', 'Economy', 9800, false, '[{"icon":"luggage","text":"15KG"}]'),
-- J&K and Ladakh
(31, 'NexFly NF-670', 'Quantum Turbine', 'rocket_launch', '06:30', 'DEL', 'Delhi', '08:00', 'SXR', 'Sheikh ul-Alam Intl', '1h 30m', 'Non-stop', 'Economy Plus', 11000, true, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
(32, 'AeroNex AN-111', 'Hypersonic Glider', 'flight', '07:00', 'DEL', 'Delhi', '08:30', 'IXL', 'Kushok Bakula Rimpochee', '1h 30m', 'Non-stop', 'Economy', 14500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Uttarakhand
(33, 'NexFly NF-125', 'Orbital Express', 'rocket_launch', '09:00', 'DEL', 'Delhi', '10:00', 'DED', 'Jolly Grant Dehradun', '1h 00m', 'Non-stop', 'Economy Plus', 5200, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Himachal Pradesh
(34, 'StarLink SL-950', 'Sub-Orbital Jet', 'flight', '11:00', 'DEL', 'Delhi', '12:15', 'DHM', 'Gaggal Dharamshala', '1h 15m', 'Non-stop', 'Economy', 6500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Andhra Pradesh
(35, 'NexFly NF-780', 'Quantum Turbine', 'rocket_launch', '08:30', 'HYD', 'Hyderabad', '09:45', 'VTZ', 'Visakhapatnam Intl', '1h 15m', 'Non-stop', 'Economy Plus', 6200, false, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Snacks"}]'),
(36, 'Vistara VX-920', 'Atmospheric Cruiser', 'airlines', '14:00', 'BLR', 'Bengaluru', '15:10', 'TIR', 'Tirupati Airport', '1h 10m', 'Non-stop', 'Economy', 4800, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Manipur (Northeast)
(37, 'AeroNex AN-222', 'Hypersonic Glider', 'flight', '06:00', 'DEL', 'Delhi', '09:00', 'IMF', 'Bir Tikendrajit Intl', '3h 00m', 'Non-stop', 'Economy', 16200, false, '[{"icon":"luggage","text":"20KG"},{"icon":"restaurant","text":"Meal Inc."}]'),
-- Tripura (Northeast)
(38, 'StarLink SL-111', 'Sub-Orbital Jet', 'flight', '07:30', 'CCU', 'Kolkata', '08:45', 'IXA', 'Maharaja Bir Bikram', '1h 15m', 'Non-stop', 'Economy', 7500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Meghalaya
(39, 'NexFly NF-890', 'Orbital Express', 'rocket_launch', '10:00', 'CCU', 'Kolkata', '11:15', 'SHL', 'Shillong Airport', '1h 15m', 'Non-stop', 'Economy Plus', 8200, false, '[{"icon":"luggage","text":"20KG"}]'),
-- Sikkim
(40, 'Vistara VX-111', 'Atmospheric Cruiser', 'airlines', '12:00', 'CCU', 'Kolkata', '13:15', 'PYG', 'Pakyong Airport', '1h 15m', 'Non-stop', 'Economy', 7800, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Nagaland
(41, 'StarLink SL-222', 'Sub-Orbital Jet', 'flight', '08:00', 'GAU', 'Guwahati', '09:00', 'DMU', 'Dimapur Airport', '1h 00m', 'Non-stop', 'Economy', 5500, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Mizoram
(42, 'AeroNex AN-333', 'Hypersonic Glider', 'flight', '09:30', 'CCU', 'Kolkata', '11:30', 'AJL', 'Lengpui Aizawl', '2h 00m', 'Non-stop', 'Economy', 9200, false, '[{"icon":"luggage","text":"15KG"}]'),
-- Arunachal Pradesh
(43, 'NexFly NF-999', 'Orbital Express', 'rocket_launch', '07:00', 'GAU', 'Guwahati', '08:00', 'HGI', 'Donyi Polo Itanagar', '1h 00m', 'Non-stop', 'Economy Plus', 6800, false, '[{"icon":"luggage","text":"20KG"}]')
ON CONFLICT (id) DO NOTHING;

-- CHARTERS
INSERT INTO charters (id, icon, departure_time, departure_full, arrival_time, arrival_full, duration, stops, price_inr, has_stop) VALUES
(1, 'rocket_launch', '06:30', 'DEL - Indira Gandhi Intl', '08:45', 'BOM - Chhatrapati Shivaji', '2h 15m', 'Nonstop', 69900, false),
(2, 'diamond', '11:15', 'DEL - Delhi', '13:35', 'BOM - Mumbai', '2h 20m', 'Nonstop', 76500, false),
(3, 'auto_awesome', '14:50', 'DEL - Delhi', '20:00', 'BOM - Mumbai', '5h 10m', '1 Stop - AMD', 54000, true),
(4, 'rocket_launch', '20:10', 'DEL - Delhi', '22:25', 'BOM - Mumbai', '2h 15m', 'Nonstop', 95700, false),
(5, 'diamond', '07:00', 'BLR - Bengaluru', '09:30', 'GOI - Goa', '1h 30m', 'Nonstop', 85000, false),
(6, 'rocket_launch', '10:00', 'DEL - Delhi', '12:00', 'SXR - Srinagar', '2h 00m', 'Nonstop', 120000, false)
ON CONFLICT (id) DO NOTHING;

-- SEATS (for Flight 1)
INSERT INTO seats (id, flight_id, seat_code, cabin_class, is_taken, row_number, is_exit_row) VALUES
(1, 1, '1A', 'BUSINESS', true, 1, false),(2, 1, '1B', 'BUSINESS', false, 1, false),
(3, 1, '1C', 'BUSINESS', false, 1, false),(4, 1, '1D', 'BUSINESS', true, 1, false),
(5, 1, '2A', 'BUSINESS', false, 2, false),(6, 1, '2B', 'BUSINESS', false, 2, false),
(7, 1, '2C', 'BUSINESS', false, 2, false),(8, 1, '2D', 'BUSINESS', false, 2, false),
(9, 1, '10A', 'ECONOMY', true, 10, false),(10, 1, '10B', 'ECONOMY', false, 10, false),
(11, 1, '10C', 'ECONOMY', false, 10, false),(12, 1, '10D', 'ECONOMY', false, 10, false),
(13, 1, '10E', 'ECONOMY', false, 10, false),(14, 1, '10F', 'ECONOMY', false, 10, false),
(15, 1, '14A', 'ECONOMY', false, 14, false),(16, 1, '14B', 'ECONOMY', false, 14, false),
(17, 1, '14C', 'ECONOMY', false, 14, false),(18, 1, '14D', 'ECONOMY', true, 14, false),
(19, 1, '14E', 'ECONOMY', false, 14, false),(20, 1, '14F', 'ECONOMY', false, 14, false),
(21, 1, '20A', 'ECONOMY', false, 20, true),(22, 1, '20B', 'ECONOMY', false, 20, true),
(23, 1, '20C', 'ECONOMY', false, 20, true),(24, 1, '20D', 'ECONOMY', false, 20, true),
(25, 1, '20E', 'ECONOMY', false, 20, true),(26, 1, '20F', 'ECONOMY', false, 20, true)
ON CONFLICT (id) DO NOTHING;

-- Reset sequences
SELECT setval('destinations_id_seq', (SELECT MAX(id) FROM destinations));
SELECT setval('flights_id_seq', (SELECT MAX(id) FROM flights));
SELECT setval('charters_id_seq', (SELECT MAX(id) FROM charters));
SELECT setval('seats_id_seq', (SELECT MAX(id) FROM seats));
