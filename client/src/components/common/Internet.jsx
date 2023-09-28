import React from "react";

export default function Internet() {
  return (
    <>
      <div className="flex flex-col justify-center w-screen h-screen bg-panel-header-background text-panel-header-icon ">
        <div className="flex justify-center items-center w-full">
          <img src="/icon.png" height={400} width={300} />
        </div>
        <div className="mx-auto">
          <section className="page_404 ">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="col-sm-10 col-sm-offset-1  text-center">
                    <div className="four_zero_four_bg">
                      <h1 className="text-center text-secondary ">404</h1>
                    </div>

                    <div className="contant_box_404">
                      <h3 className="h2">Look like you're lost</h3>

                      <p>Please Connect with Internet then Referesh Page</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
