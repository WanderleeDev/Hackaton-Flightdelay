-- Populate flights table with origin-destination pairs
-- This creates sample flight routes based on the provided data
-- Using a subset of realistic routes for the hackathon

INSERT INTO flights (id, origin_iata, destination_iata, airline_code) VALUES
-- From SFO (San Francisco)
('1', 'SFO', 'LAX', 'UA'),
('2', 'SFO', 'SEA', 'AS'),
('3', 'SFO', 'DEN', 'UA'),
('4', 'SFO', 'ORD', 'UA'),
('5', 'SFO', 'JFK', 'UA'),
('6', 'SFO', 'ATL', 'DL'),
('7', 'SFO', 'PHX', 'AA'),
('8', 'SFO', 'LAS', 'WN'),
('9', 'SFO', 'HNL', 'HA'),
('10', 'SFO', 'IAH', 'UA'),

-- From LAX (Los Angeles)
('11', 'LAX', 'SFO', 'UA'),
('12', 'LAX', 'JFK', 'AA'),
('13', 'LAX', 'ORD', 'AA'),
('14', 'LAX', 'DFW', 'AA'),
('15', 'LAX', 'SEA', 'AS'),
('16', 'LAX', 'LAS', 'WN'),
('17', 'LAX', 'PHX', 'AA'),
('18', 'LAX', 'DEN', 'UA'),
('19', 'LAX', 'ATL', 'DL'),
('20', 'LAX', 'HNL', 'HA'),

-- From JFK (New York)
('21', 'JFK', 'LAX', 'AA'),
('22', 'JFK', 'SFO', 'UA'),
('23', 'JFK', 'ORD', 'AA'),
('24', 'JFK', 'MIA', 'AA'),
('25', 'JFK', 'ATL', 'DL'),
('26', 'JFK', 'BOS', 'B6'),
('27', 'JFK', 'SEA', 'AS'),
('28', 'JFK', 'DEN', 'UA'),
('29', 'JFK', 'LAS', 'B6'),
('30', 'JFK', 'MCO', 'B6'),

-- From ORD (Chicago)
('31', 'ORD', 'LAX', 'AA'),
('32', 'ORD', 'SFO', 'UA'),
('33', 'ORD', 'JFK', 'AA'),
('34', 'ORD', 'DEN', 'UA'),
('35', 'ORD', 'SEA', 'UA'),
('36', 'ORD', 'ATL', 'DL'),
('37', 'ORD', 'PHX', 'AA'),
('38', 'ORD', 'LAS', 'WN'),
('39', 'ORD', 'MIA', 'AA'),
('40', 'ORD', 'DFW', 'AA'),

-- From ATL (Atlanta)
('41', 'ATL', 'LAX', 'DL'),
('42', 'ATL', 'JFK', 'DL'),
('43', 'ATL', 'ORD', 'DL'),
('44', 'ATL', 'DEN', 'DL'),
('45', 'ATL', 'SEA', 'DL'),
('46', 'ATL', 'MIA', 'DL'),
('47', 'ATL', 'PHX', 'DL'),
('48', 'ATL', 'LAS', 'DL'),
('49', 'ATL', 'MCO', 'DL'),
('50', 'ATL', 'BOS', 'DL'),

-- From DEN (Denver)
('51', 'DEN', 'LAX', 'UA'),
('52', 'DEN', 'SFO', 'UA'),
('53', 'DEN', 'ORD', 'UA'),
('54', 'DEN', 'JFK', 'UA'),
('55', 'DEN', 'SEA', 'UA'),
('56', 'DEN', 'ATL', 'DL'),
('57', 'DEN', 'PHX', 'WN'),
('58', 'DEN', 'LAS', 'WN'),
('59', 'DEN', 'DFW', 'UA'),
('60', 'DEN', 'IAH', 'UA'),

-- From SEA (Seattle)
('61', 'SEA', 'LAX', 'AS'),
('62', 'SEA', 'SFO', 'AS'),
('63', 'SEA', 'ORD', 'UA'),
('64', 'SEA', 'JFK', 'AS'),
('65', 'SEA', 'DEN', 'UA'),
('66', 'SEA', 'ATL', 'DL'),
('67', 'SEA', 'PHX', 'AS'),
('68', 'SEA', 'LAS', 'AS'),
('69', 'SEA', 'PDX', 'AS'),
('70', 'SEA', 'HNL', 'HA'),

-- From DFW (Dallas)
('71', 'DFW', 'LAX', 'AA'),
('72', 'DFW', 'JFK', 'AA'),
('73', 'DFW', 'ORD', 'AA'),
('74', 'DFW', 'DEN', 'UA'),
('75', 'DFW', 'SEA', 'AA'),
('76', 'DFW', 'ATL', 'DL'),
('77', 'DFW', 'PHX', 'AA'),
('78', 'DFW', 'LAS', 'WN'),
('79', 'DFW', 'MIA', 'AA'),
('80', 'DFW', 'IAH', 'AA'),

-- From MIA (Miami)
('81', 'MIA', 'JFK', 'AA'),
('82', 'MIA', 'LAX', 'AA'),
('83', 'MIA', 'ORD', 'AA'),
('84', 'MIA', 'ATL', 'DL'),
('85', 'MIA', 'DFW', 'AA'),
('86', 'MIA', 'BOS', 'B6'),
('87', 'MIA', 'LAS', 'AA'),
('88', 'MIA', 'MCO', 'AA'),
('89', 'MIA', 'FLL', 'AA'),
('90', 'MIA', 'IAH', 'UA'),

-- From PHX (Phoenix)
('91', 'PHX', 'LAX', 'AA'),
('92', 'PHX', 'SFO', 'AA'),
('93', 'PHX', 'ORD', 'AA'),
('94', 'PHX', 'DEN', 'WN'),
('95', 'PHX', 'SEA', 'AS'),
('96', 'PHX', 'ATL', 'DL'),
('97', 'PHX', 'DFW', 'AA'),
('98', 'PHX', 'LAS', 'WN'),
('99', 'PHX', 'IAH', 'UA'),
('100', 'PHX', 'JFK', 'AA');
