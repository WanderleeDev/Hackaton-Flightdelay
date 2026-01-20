-- Populate flights table with origin-destination pairs
-- This creates sample flight routes based on the provided data
-- Using a subset of realistic routes for the hackathon

INSERT INTO flights (origin_iata, destination_iata, airline_code) VALUES
-- From SFO (San Francisco)
('SFO', 'LAX', 'UA'),
('SFO', 'SEA', 'AS'),
('SFO', 'DEN', 'UA'),
('SFO', 'ORD', 'UA'),
('SFO', 'JFK', 'UA'),
('SFO', 'ATL', 'DL'),
('SFO', 'PHX', 'AA'),
('SFO', 'LAS', 'WN'),
('SFO', 'HNL', 'HA'),
('SFO', 'IAH', 'UA'),

-- From LAX (Los Angeles)
('LAX', 'SFO', 'UA'),
('LAX', 'JFK', 'AA'),
('LAX', 'ORD', 'AA'),
('LAX', 'DFW', 'AA'),
('LAX', 'SEA', 'AS'),
('LAX', 'LAS', 'WN'),
('LAX', 'PHX', 'AA'),
('LAX', 'DEN', 'UA'),
('LAX', 'ATL', 'DL'),
('LAX', 'HNL', 'HA'),

-- From JFK (New York)
('JFK', 'LAX', 'AA'),
('JFK', 'SFO', 'UA'),
('JFK', 'ORD', 'AA'),
('JFK', 'MIA', 'AA'),
('JFK', 'ATL', 'DL'),
('JFK', 'BOS', 'B6'),
('JFK', 'SEA', 'AS'),
('JFK', 'DEN', 'UA'),
('JFK', 'LAS', 'B6'),
('JFK', 'MCO', 'B6'),

-- From ORD (Chicago)
('ORD', 'LAX', 'AA'),
('ORD', 'SFO', 'UA'),
('ORD', 'JFK', 'AA'),
('ORD', 'DEN', 'UA'),
('ORD', 'SEA', 'UA'),
('ORD', 'ATL', 'DL'),
('ORD', 'PHX', 'AA'),
('ORD', 'LAS', 'WN'),
('ORD', 'MIA', 'AA'),
('ORD', 'DFW', 'AA'),

-- From ATL (Atlanta)
('ATL', 'LAX', 'DL'),
('ATL', 'JFK', 'DL'),
('ATL', 'ORD', 'DL'),
('ATL', 'DEN', 'DL'),
('ATL', 'SEA', 'DL'),
('ATL', 'MIA', 'DL'),
('ATL', 'PHX', 'DL'),
('ATL', 'LAS', 'DL'),
('ATL', 'MCO', 'DL'),
('ATL', 'BOS', 'DL'),

-- From DEN (Denver)
('DEN', 'LAX', 'UA'),
('DEN', 'SFO', 'UA'),
('DEN', 'ORD', 'UA'),
('DEN', 'JFK', 'UA'),
('DEN', 'SEA', 'UA'),
('DEN', 'ATL', 'DL'),
('DEN', 'PHX', 'WN'),
('DEN', 'LAS', 'WN'),
('DEN', 'DFW', 'UA'),
('DEN', 'IAH', 'UA'),

-- From SEA (Seattle)
('SEA', 'LAX', 'AS'),
('SEA', 'SFO', 'AS'),
('SEA', 'ORD', 'UA'),
('SEA', 'JFK', 'AS'),
('SEA', 'DEN', 'UA'),
('SEA', 'ATL', 'DL'),
('SEA', 'PHX', 'AS'),
('SEA', 'LAS', 'AS'),
('SEA', 'PDX', 'AS'),
('SEA', 'HNL', 'HA'),

-- From DFW (Dallas)
('DFW', 'LAX', 'AA'),
('DFW', 'JFK', 'AA'),
('DFW', 'ORD', 'AA'),
('DFW', 'DEN', 'UA'),
('DFW', 'SEA', 'AA'),
('DFW', 'ATL', 'DL'),
('DFW', 'PHX', 'AA'),
('DFW', 'LAS', 'WN'),
('DFW', 'MIA', 'AA'),
('DFW', 'IAH', 'AA'),

-- From MIA (Miami)
('MIA', 'JFK', 'AA'),
('MIA', 'LAX', 'AA'),
('MIA', 'ORD', 'AA'),
('MIA', 'ATL', 'DL'),
('MIA', 'DFW', 'AA'),
('MIA', 'BOS', 'B6'),
('MIA', 'LAS', 'AA'),
('MIA', 'MCO', 'AA'),
('MIA', 'FLL', 'AA'),
('MIA', 'IAH', 'UA'),

-- From PHX (Phoenix)
('PHX', 'LAX', 'AA'),
('PHX', 'SFO', 'AA'),
('PHX', 'ORD', 'AA'),
('PHX', 'DEN', 'WN'),
('PHX', 'SEA', 'AS'),
('PHX', 'ATL', 'DL'),
('PHX', 'DFW', 'AA'),
('PHX', 'LAS', 'WN'),
('PHX', 'IAH', 'UA'),
('PHX', 'JFK', 'AA');
