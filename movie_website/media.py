"""Defines class Movie, that contains details of the movie."""

import webbrowser

class Movie():
    """ Class for representing a movie """
    def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube,year_released, director, writer):
        
        """ Initiate a Movie object 
        Arguments explained:
            movie_title = a string of the movie's title
            movie_storyline = a string of a short movie plot
            poster_image = a string containing a URL to a poster image
            trailer_youtube = a string containing a youtube URL of the movie's trailer
            year_release = an integer of the year the movie was released
            director = a string of the director of the movie
            writer = a string of screanwriter/s of the movie
        """
        
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube
        self.year_released = year_released
        self.director = director
        self.screenwriter = writer 
        
    def show_trailer(self):
        
        """ Opens trailer in a web browser """
        
        webbrowser.open(self.trailer_youtube_url)
