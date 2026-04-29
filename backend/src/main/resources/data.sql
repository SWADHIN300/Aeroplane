-- NexFly Seed Data
-- This file populates the database with initial data for the NexFly airline booking app.
-- It runs on every startup but uses INSERT...ON CONFLICT DO NOTHING to avoid duplicates.

-- ============================================================
-- DESTINATIONS
-- ============================================================
INSERT INTO destinations (id, city, region, tagline, image_url, price_inr) VALUES
(1, 'Dubai', 'EMIRATES', 'The city of tomorrow, today.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1JjpvLibaeCOMwl3jkBph8y_zHT4InyhpHLAqSFElYbIv_XVoXMT3aiMzfg69Xe397EdFUeQe6FHAZqEkg8fF_v0M5QF9FyA5G5DEKJcLHwqcCjE8Nyae4goBg8rQ-VvASGA9qrlbjS9jEARWuU16b_vzGxTH-GbwN_FFC4YTeO1DMTwqYVx_ixV8xDT4ppyE-YzyitUy6TWTMPZvBbASEyK1QqJZzedwfqP566sREiXsunv1Y-TBiVoV7FzRTOvOvsmRWy3CKbmX', 99900),
(2, 'Singapore', 'ASIA', 'Lush green meets neon dreams.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcdYQQ8PftyBLlmkIXvrcz1z9QYbzEf3HIk4PDbsrOnsfauN6z72irD-ry8dUD0l3iMfkhbnHGhHs1Dh_q9sFVBpJovpytpR3YFOr86A1nC1iHCOu86d9wMfv2eIixM8ENl4TmapqScjoMgdQGJeTvPJVo1spgRBJzUl7zwpfn79oK-u4hHPCqQvrvWH61P4hTpB5i_YtFQbbBPTMzR9MmY6NwZavzMjR6_MZ6hp8pbo64ZZckUuoL3vcPOGu9bX5lgmPbOz187zvT', 79000),
(3, 'Tokyo', 'JAPAN', 'Where tradition fuels innovation.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkKFx0fEAqYMxpPoM8_3h8TUucZi1CltcLFX10gJh2Ol0tQcAZS4iObHMwVMDeRqb-7AwMBGivDWvx2pDV3aomGeaO3tFeUZOBlq_b5ofJ2Ut8nSwlmMSmUG8iSZgxuSmCxvFWjiKdTyUvoWXddHc1sG06MOdevvlZn9-5utL3umsBPSx9kddNwvK2gA2kCWZTSyMrOjKQ7FKbmLn0zPZjNncE9q_FIJ_jtSf2jLaRA00kP2d4a8maOmfcf52ZHn3VH67jcgROdvtk', 91500),
(4, 'Kyoto', 'CULTURE', 'Ancient temples, modern soul.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmKv7nxkQnyJbb6mlkPpwitUGDVwQvwYOF7p2S3-rJwsMB2tmMK-DpWvpatTHwY6oAbPwnkQbeezfdJmXBowAARZTqsKP0S7KL-6mlSUDxuyVi__lI-IXwBrMEudIBp8Z3kOg6On_5H9KmF8Junh86tvLqU7cR1rjIJZjG_QaiSslId7ZHSTuUW3ub2KAqspqZv2vrtUr3Y_Tqsfewy2mW4zINR9yb3nacIfytDjl5oyuZKNNXvT1vu_ggNliBhC6VV7FofcpyLR7', 120000)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- FLIGHTS
-- ============================================================
INSERT INTO flights (id, airline, type, icon, departure_time, departure_code, departure_name, arrival_time, arrival_code, arrival_name, duration, stops, flight_class, price_inr, confirmed, amenities) VALUES
(1, 'NexFly NF-802', 'Advanced Orbital Propulsion', 'rocket_launch', '08:30', 'DEL', 'Indira Gandhi', '10:45', 'BOM', 'Chhatrapati Shivaji', '2h 15m', 'Non-stop', 'Economy Plus', 18499, true, '[{"icon":"luggage","text":"25KG"},{"icon":"restaurant","text":"Meal Inc."},{"icon":"wifi","text":"Satellite Net"}]'),
(2, 'StarLink SL-104', 'Sub-Orbital Jet', 'flight', '14:15', 'DEL', 'Delhi', '16:45', 'BOM', 'Mumbai', '2h 30m', 'Non-stop', 'Standard Economy', 12200, false, '[{"icon":"luggage","text":"15KG"}]'),
(3, 'Vistara VX-210', 'Atmospheric Cruiser', 'airlines', '19:00', 'DEL', 'Delhi', '21:10', 'BOM', 'Mumbai', '2h 10m', 'Non-stop', 'Business', 24800, false, '[{"icon":"luggage","text":"30KG"},{"icon":"restaurant","text":"Gourmet"},{"icon":"wifi","text":"WiFi 6E"}]'),
(4, 'NexFly NF-330', 'Quantum Turbine', 'rocket_launch', '06:00', 'BOM', 'Mumbai', '08:30', 'DXB', 'Dubai Int''l', '3h 30m', 'Non-stop', 'First Class', 45000, false, '[{"icon":"luggage","text":"40KG"},{"icon":"restaurant","text":"Fine Dining"},{"icon":"wifi","text":"Satellite Net"},{"icon":"chair","text":"Lie-Flat"}]'),
(5, 'AeroNex AN-777', 'Hypersonic Glider', 'flight', '22:00', 'DEL', 'Delhi', '06:30', 'LHR', 'Heathrow', '8h 30m', 'Non-stop', 'Business Executive', 68000, true, '[{"icon":"luggage","text":"35KG"},{"icon":"restaurant","text":"5-Star"},{"icon":"wifi","text":"WiFi 6E"},{"icon":"chair","text":"Suite"}]')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- CHARTERS
-- ============================================================
INSERT INTO charters (id, icon, departure_time, departure_full, arrival_time, arrival_full, duration, stops, price_inr, has_stop) VALUES
(1, 'rocket_launch', '06:30', 'DEL - Indira Gandhi Int''l', '08:45', 'BOM - Chhatrapati Shivaji', '2h 15m', 'Nonstop', 69900, false),
(2, 'diamond', '11:15', 'DEL', '13:35', 'BOM', '2h 20m', 'Nonstop', 76500, false),
(3, 'auto_awesome', '14:50', 'DEL', '20:00', 'BOM', '5h 10m', '1 Stop - AMD', 54000, true),
(4, 'rocket_launch', '20:10', 'DEL', '22:25', 'BOM', '2h 15m', 'Nonstop', 95700, false)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SEATS (for Flight 1: NexFly NF-802)
-- ============================================================
-- Business Class (rows 1-2, seats A-D)
INSERT INTO seats (id, flight_id, seat_code, cabin_class, is_taken, row_number, is_exit_row) VALUES
(1, 1, '1A', 'BUSINESS', true, 1, false),
(2, 1, '1B', 'BUSINESS', false, 1, false),
(3, 1, '1C', 'BUSINESS', false, 1, false),
(4, 1, '1D', 'BUSINESS', true, 1, false),
(5, 1, '2A', 'BUSINESS', false, 2, false),
(6, 1, '2B', 'BUSINESS', false, 2, false),
(7, 1, '2C', 'BUSINESS', false, 2, false),
(8, 1, '2D', 'BUSINESS', false, 2, false)
ON CONFLICT (id) DO NOTHING;

-- Economy Class (rows 10, 14, 20)
INSERT INTO seats (id, flight_id, seat_code, cabin_class, is_taken, row_number, is_exit_row) VALUES
(9, 1, '10A', 'ECONOMY', true, 10, false),
(10, 1, '10B', 'ECONOMY', false, 10, false),
(11, 1, '10C', 'ECONOMY', false, 10, false),
(12, 1, '10D', 'ECONOMY', false, 10, false),
(13, 1, '10E', 'ECONOMY', false, 10, false),
(14, 1, '10F', 'ECONOMY', false, 10, false),
(15, 1, '14A', 'ECONOMY', false, 14, false),
(16, 1, '14B', 'ECONOMY', false, 14, false),
(17, 1, '14C', 'ECONOMY', false, 14, false),
(18, 1, '14D', 'ECONOMY', true, 14, false),
(19, 1, '14E', 'ECONOMY', false, 14, false),
(20, 1, '14F', 'ECONOMY', false, 14, false),
(21, 1, '20A', 'ECONOMY', false, 20, true),
(22, 1, '20B', 'ECONOMY', false, 20, true),
(23, 1, '20C', 'ECONOMY', false, 20, true),
(24, 1, '20D', 'ECONOMY', false, 20, true),
(25, 1, '20E', 'ECONOMY', false, 20, true),
(26, 1, '20F', 'ECONOMY', false, 20, true)
ON CONFLICT (id) DO NOTHING;

-- Reset sequences to avoid conflicts with future inserts
SELECT setval('destinations_id_seq', (SELECT MAX(id) FROM destinations));
SELECT setval('flights_id_seq', (SELECT MAX(id) FROM flights));
SELECT setval('charters_id_seq', (SELECT MAX(id) FROM charters));
SELECT setval('seats_id_seq', (SELECT MAX(id) FROM seats));
